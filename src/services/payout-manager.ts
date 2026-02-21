/**
 * Charity Payout Manager
 * Handles monthly disbursement of funds to charities
 */

export interface CharityPayout {
    payoutId: string;
    charityId: string;
    amount: number;
    month: string;
    year: number;
    status: "pending" | "processing" | "completed" | "failed";
    stripeTransferId?: string;
    stripePayoutId?: string;
    processedAt?: string;
    bankAccount?: string;
}

export interface PayoutSummary {
    totalCharities: number;
    totalAmount: number;
    successfulPayouts: number;
    failedPayouts: number;
    month: string;
    year: number;
    completedAt?: string;
}

/**
 * Calculate charity payouts from monthly donations
 * Called after donation processing is complete
 */
export async function calculateCharityPayouts(
    month: number,
    year: number,
): Promise<CharityPayout[]> {
    try {
        console.log(`Calculating charity payouts for ${month}/${year}`);

        // In production: Query database for all donations from this month
        // Group by charity and sum amounts

        const payouts: CharityPayout[] = [];

        // Mock charity totals from all companies
        const mockCharityTotals: {
            [charityId: string]: { donations: number; match: number };
        } = {
            char_1: { donations: 500, match: 250 },
            char_2: { donations: 300, match: 150 },
            char_3: { donations: 1000, match: 500 },
        };

        // Subtract platform fee (2%)
        const platformFeePercentage = 0.02;

        for (const [charityId, totals] of Object.entries(mockCharityTotals)) {
            const totalAmount = totals.donations + totals.match;
            const platformFee = totalAmount * platformFeePercentage;
            const payoutAmount = totalAmount - platformFee;

            const payout: CharityPayout = {
                payoutId: `payout_${Date.now()}_${charityId}`,
                charityId,
                amount: payoutAmount,
                month: new Date(year, month - 1).toLocaleString("default", {
                    month: "long",
                }),
                year,
                status: "pending",
            };

            payouts.push(payout);

            // Log the calculation
            console.log(
                `  ${charityId}: €${totalAmount} (- €${platformFee} fee) = €${payoutAmount}`,
            );
        }

        // Store payouts
        payouts.forEach((payout) => {
            localStorage.setItem(
                `payout_${payout.payoutId}`,
                JSON.stringify(payout),
            );
        });

        return payouts;
    } catch (error) {
        throw new Error(`Failed to calculate payouts: ${error}`);
    }
}

/**
 * Process charity payouts via Stripe
 * Transfers funds to each charity's bank account
 */
export async function processCharityPayouts(
    payouts: CharityPayout[],
): Promise<PayoutSummary> {
    try {
        console.log(`Processing ${payouts.length} charity payouts...`);

        let successCount = 0;
        let failCount = 0;
        let totalAmount = 0;

        for (const payout of payouts) {
            try {
                // In production: Process via Stripe
                // const stripeTransfer = await stripe.transfers.create({
                //   amount: Math.round(payout.amount * 100), // Convert to cents
                //   currency: 'eur',
                //   destination: charityStripeAccount,
                // });

                payout.status = "completed";
                payout.stripeTransferId = `tr_${Date.now()}`;
                payout.stripePayoutId = `po_${Date.now()}`;
                payout.processedAt = new Date().toISOString();

                localStorage.setItem(
                    `payout_${payout.payoutId}`,
                    JSON.stringify(payout),
                );

                successCount++;
                totalAmount += payout.amount;

                console.log(
                    `  ✅ Payout to ${payout.charityId}: €${payout.amount}`,
                );
            } catch (error) {
                payout.status = "failed";
                failCount++;
                localStorage.setItem(
                    `payout_${payout.payoutId}`,
                    JSON.stringify(payout),
                );
                console.error(
                    `  ❌ Failed to payout to ${payout.charityId}: ${error}`,
                );
            }
        }

        const summary: PayoutSummary = {
            totalCharities: payouts.length,
            totalAmount,
            successfulPayouts: successCount,
            failedPayouts: failCount,
            month: payouts[0]?.month || "Unknown",
            year: payouts[0]?.year || new Date().getFullYear(),
            completedAt: new Date().toISOString(),
        };

        console.log(`\n📊 Payout Summary:`);
        console.log(`   Total Charities: ${summary.totalCharities}`);
        console.log(`   Successful: ${summary.successfulPayouts}`);
        console.log(`   Failed: ${summary.failedPayouts}`);
        console.log(`   Total Amount: €${summary.totalAmount}`);

        return summary;
    } catch (error) {
        throw new Error(`Failed to process payouts: ${error}`);
    }
}

/**
 * Get charity bank account details
 */
export async function getCharityBankAccount(
    charityId: string,
): Promise<{ accountHolder: string; bankAccount: string; bankCode: string }> {
    // In production: Query database
    const charityAccounts: {
        [key: string]: {
            accountHolder: string;
            bankAccount: string;
            bankCode: string;
        };
    } = {
        char_1: {
            accountHolder: "Food for All",
            bankAccount: "12345678",
            bankCode: "87654321",
        },
        char_2: {
            accountHolder: "Clean Water Initiative",
            bankAccount: "87654321",
            bankCode: "12345678",
        },
        char_3: {
            accountHolder: "Education Tomorrow",
            bankAccount: "11111111",
            bankCode: "99999999",
        },
    };

    return charityAccounts[charityId] || {};
}

/**
 * Get payout history for a charity
 */
export async function getCharityPayoutHistory(
    charityId: string,
): Promise<CharityPayout[]> {
    const payouts: CharityPayout[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("payout_")) {
            const payout = JSON.parse(localStorage.getItem(key) || "{}");
            if (payout.charityId === charityId) {
                payouts.push(payout);
            }
        }
    }

    return payouts.sort(
        (a, b) =>
            new Date(b.processedAt || 0).getTime() -
            new Date(a.processedAt || 0).getTime(),
    );
}

/**
 * Retry failed payouts
 */
export async function retryFailedPayouts(): Promise<CharityPayout[]> {
    const failedPayouts: CharityPayout[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("payout_")) {
            const payout = JSON.parse(localStorage.getItem(key) || "{}");
            if (payout.status === "failed") {
                failedPayouts.push(payout);
            }
        }
    }

    console.log(`Retrying ${failedPayouts.length} failed payouts...`);

    for (const payout of failedPayouts) {
        try {
            payout.status = "completed";
            payout.processedAt = new Date().toISOString();
            localStorage.setItem(
                `payout_${payout.payoutId}`,
                JSON.stringify(payout),
            );
        } catch (error) {
            console.error(
                `Failed to retry payout ${payout.payoutId}: ${error}`,
            );
        }
    }

    return failedPayouts;
}

/**
 * Generate tax receipts for charities
 * German "Spendenbescheinigung"
 */
export async function generateCharityTaxReceipt(
    charityId: string,
    month: number,
    year: number,
): Promise<{
    charityId: string;
    receiptNumber: string;
    month: string;
    year: number;
    totalDonations: number;
    description: string;
    generatedAt: string;
}> {
    const receipt = {
        charityId,
        receiptNumber: `RECEIPT-${charityId}-${year}-${month}`,
        month: new Date(year, month - 1).toLocaleString("default", {
            month: "long",
        }),
        year,
        totalDonations: 0, // Would sum from payouts
        description: "Tax Receipt for Donations Received",
        generatedAt: new Date().toISOString(),
    };

    // In production: Store receipt in database
    localStorage.setItem(
        `receipt_${receipt.receiptNumber}`,
        JSON.stringify(receipt),
    );

    return receipt;
}

/**
 * Get accounting summary for platform
 */
export async function getAccountingSummary(
    month: number,
    year: number,
): Promise<{
    totalDonations: number;
    totalMatch: number;
    platformFees: number;
    charitiesPayedOut: number;
    failedPayouts: number;
}> {
    const payouts: CharityPayout[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("payout_")) {
            const payout = JSON.parse(localStorage.getItem(key) || "{}");
            if (payout.year === year && payout.month === month) {
                payouts.push(payout);
            }
        }
    }

    const successfulPayouts = payouts.filter((p) => p.status === "completed");
    const failedPayouts = payouts.filter((p) => p.status === "failed");

    const totalPayedOut = successfulPayouts.reduce(
        (sum, p) => sum + p.amount,
        0,
    );
    const platformFees = totalPayedOut * 0.02; // 2% fee
    const totalWithFees = totalPayedOut + platformFees;

    return {
        totalDonations: totalWithFees * 0.67, // Approximate employee donations
        totalMatch: totalWithFees * 0.33, // Approximate company match
        platformFees,
        charitiesPayedOut: successfulPayouts.length,
        failedPayouts: failedPayouts.length,
    };
}
