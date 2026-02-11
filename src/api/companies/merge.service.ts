import { apiClient } from "../axios.config"
import { COMPANIES_BASE } from "../endpoints";
import type { Company } from "../types/company.types";
import type { MergeConflicts, MergeCompleteCompanyUpdate } from "../types/merge.types";

export const mergeService = {
    getMergeConflicts(targetId: string, duplicateId: string): Promise<MergeConflicts> {
        return apiClient
            .get<MergeConflicts>(`${COMPANIES_BASE}/${targetId}/preview-merge/${duplicateId}`)
            .then((res) => res.data);
    },
    
    completeMerge(
        targetId: string,
        duplicateId: string,
        targetCompany: MergeCompleteCompanyUpdate
    ): Promise<Company> {
        return apiClient
            .post<Company>(`${COMPANIES_BASE}/${targetId}/merge/${duplicateId}`, targetCompany)
            .then((res) => res.data);
    }
}