
import { apiClient } from "../axios.config"
import { COMPANIES_BASE } from "../endpoints";
import type { Company } from "../types/company.types";

export const companiesService = {
    getCompanies(): Promise<Company[]> {
        return apiClient
            .get<Company[]>(COMPANIES_BASE + "/")
            .then((res) => res.data);
    },

    getCompanyById(companyId: string): Promise<Company> {
        return apiClient
            .get<Company>(`${COMPANIES_BASE}/${companyId}`)
            .then((res) => res.data);
    }
}