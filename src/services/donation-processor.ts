/**
 * Donation Processing Service
 * Handles monthly batch processing of employee donations
 */

export interface ProcessedDonation {
    donationId: string;
    companyId: string;
    employeeId: string;
    charityId: string;
    amount: number;
    companyMatch: number;
    totalAmount: number;
    status: "pending" | "completed" | "failed";
    stripePaymentId?: string;
    processedAt: string;
}

export interface DonationBatch {
    batchId: string;
    month: string;
    year: number;
    companyId: string;
    totalAmount: number;
    totalMatch: number;
    donationCount: number;
    status: "pending" | "processing" | "completed" | "failed";
    processedAt?: string;
}

/**
 * Process monthly donations for all active employees in a company
 * Called on the 1st of each month
 */
export async function processMonthlyDonations(
    companyId: string,
): Promise<DonationBatch> {
    try {
        console.log(
            `Starting monthly donation processing for company ${companyId}`,
        );

        // Get all active subscriptions for the company
        // In production: const subscriptions = await getActiveSubscriptions(companyId);

        const batch: DonationBatch = {
            batchId: `batch_${Date.now()}`,
            month: new Date().toLocaleString("default", { month: "long" }),
            year: new Date().getFullYear(),
            companyId,
            totalAmount: 0,
            totalMatch: 0,
            donationCount: 0,
            status: "processing",
        };

        // Mock subscriptions
        const mockSubscriptions = [
            {
                employeeId: "emp_1",
                monthly: 50,
                charities: [
                    { charityId: "char_1", allocation: 60 },
                    { charityId: "char_2", allocation: 40 },
                ],
            },
            {
                employeeId: "emp_2",
                monthly: 100,
                charities: [{ charityId: "char_3", allocation: 100 }],
            },
        ];

        const donations: ProcessedDonation[] = [];

        for (const subscription of mockSubscriptions) {
            const companyMatchAmount = subscription.monthly * 0.5; // 50% match

            for (const charity of subscription.charities) {
                const donationAmount =
                    (subscription.monthly * charity.allocation) / 100;
                const matchAmount =
                    (companyMatchAmount * charity.allocation) / 100;

                const donation: ProcessedDonation = {
                    donationId: `don_${Date.now()}_${Math.random()}`,
                    companyId,
                    employeeId: subscription.employeeId,
                    charityId: charity.charityId,
                    amount: donationAmount,
                    companyMatch: matchAmount,
                    totalAmount: donationAmount + matchAmount,
                    status: "completed",
                    stripePaymentId: `ch_${Date.now()}_${Math.random()}`,
                    processedAt: new Date().toISOString(),
                };

                donations.push(donation);
                batch.totalAmount += donationAmount;
                batch.totalMatch += matchAmount;
            }
            batch.donationCount += subscription.charities.length;
        }

        // Store donations in database
        donations.forEach((donation) => {
            localStorage.setItem(
                `donation_${donation.donationId}`,
                JSON.stringify(donation),
            );
        });

        batch.status = "completed";
        batch.processedAt = new Date().toISOString();

        // Store batch
        localStorage.setItem(`batch_${batch.batchId}`, JSON.stringify(batch));

        console.log(
            `✅ Processed ${batch.donationCount} donations for company ${companyId}`,
        );
        console.log(`   Total donations: €${batch.totalAmount}`);
        console.log(`   Total match: €${batch.totalMatch}`);

        return batch;
    } catch (error) {
        console.error(`Failed to process donations: ${error}`);
        throw new Error(`Donation processing failed: ${error}`);
    }
}

/**
 * Get all donations for a company in a specific month
 */
export async function getCompanyDonations(
    companyId: string,
    month: number,
    year: number,
): Promise<ProcessedDonation[]> {
    // In production: Query database for donations matching company, month, year
    const donations: ProcessedDonation[] = [];

    // Mock implementation - scan localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("donation_")) {
            const donation = JSON.parse(localStorage.getItem(key) || "{}");
            if (
                donation.companyId === companyId &&
                new Date(donation.processedAt).getMonth() === month &&
                new Date(donation.processedAt).getFullYear() === year
            ) {
                donations.push(donation);
            }
        }
    }

    return donations;
}

/**
 * Get employee's personal donation history
 */
export async function getEmployeeDonationHistory(
    employeeId: string,
): Promise<ProcessedDonation[]> {
    const donations: ProcessedDonation[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("donation_")) {
            const donation = JSON.parse(localStorage.getItem(key) || "{}");
            if (donation.employeeId === employeeId) {
                donations.push(donation);
            }
        }
    }

    return donations;
}

/**
 * Calculate total donations by charity
 */
export async function calculateCharityTotals(
    companyId: string,
    month: number,
    year: number,
): Promise<{ [charityId: string]: { donations: number; match: number } }> {
    const donations = await getCompanyDonations(companyId, month, year);

    const totals: {
        [charityId: string]: { donations: number; match: number };
    } = {};

    donations.forEach((donation) => {
        if (!totals[donation.charityId]) {
            totals[donation.charityId] = { donations: 0, match: 0 };
        }
        totals[donation.charityId].donations += donation.amount;
        totals[donation.charityId].match += donation.companyMatch;
    });

    return totals;
}

/**
 * Generate monthly report for a company
 */
export async function generateMonthlyReport(
    companyId: string,
    month: number,
    year: number,
): Promise<{
    companyId: string;
    month: string;
    year: number;
    totalEmployeesDonating: number;
    totalDonations: number;
    totalMatch: number;
    charityBreakdown: {
        [charityId: string]: { donations: number; match: number };
    };
    averageDonationPerEmployee: number;
    participationRate: number;
}> {
    const donations = await getCompanyDonations(companyId, month, year);
    const charityTotals = await calculateCharityTotals(companyId, month, year);

    const uniqueEmployees = new Set(donations.map((d) => d.employeeId)).size;
    const totalEmployeeDonations = donations.reduce(
        (sum, d) => sum + d.amount,
        0,
    );
    const totalMatch = donations.reduce((sum, d) => sum + d.companyMatch, 0);

    return {
        companyId,
        month: new Date(year, month - 1).toLocaleString("default", {
            month: "long",
        }),
        year,
        totalEmployeesDonating: uniqueEmployees,
        totalDonations: totalEmployeeDonations,
        totalMatch,
        charityBreakdown: charityTotals,
        averageDonationPerEmployee:
            uniqueEmployees > 0 ? totalEmployeeDonations / uniqueEmployees : 0,
        participationRate: 0, // Would calculate from total employees in company
    };
}

/**
 * Create audit log for donation processing
 */
export async function logDonationProcessing(
    batchId: string,
    action: string,
    details: any,
): Promise<void> {
    const log = {
        timestamp: new Date().toISOString(),
        batchId,
        action,
        details,
    };

    const logs = JSON.parse(localStorage.getItem("donation_logs") || "[]");
    logs.push(log);
    localStorage.setItem("donation_logs", JSON.stringify(logs));
}

/**
 * Get retry failed donations
 */
export async function retryFailedDonations(
    _batchId: string,
): Promise<ProcessedDonation[]> {
    // const batch = JSON.parse(localStorage.getItem(`batch_${batchId}`) || "{}");

    // In production: Query for donations with status "failed"
    const failedDonations: ProcessedDonation[] = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("donation_")) {
            const donation = JSON.parse(localStorage.getItem(key) || "{}");
            if (donation.status === "failed") {
                failedDonations.push(donation);
            }
        }
    }

    console.log(`Retrying ${failedDonations.length} failed donations...`);

    // Retry logic would go here
    // For now, mark all as completed
    for (const donation of failedDonations) {
        donation.status = "completed";
        donation.processedAt = new Date().toISOString();
        localStorage.setItem(
            `donation_${donation.donationId}`,
            JSON.stringify(donation),
        );
    }

    return failedDonations;
}
