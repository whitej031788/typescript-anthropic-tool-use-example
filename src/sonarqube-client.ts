import axios, { AxiosInstance } from 'axios';

type Issue = {
    key: string;
    rule: string;
    severity: 'BLOCKER' | 'CRITICAL' | 'MAJOR' | 'MINOR' | 'INFO';
    status: 'OPEN' | 'CLOSED' | 'RESOLVED';
    message: string;
    effort: string;
    debt: string;
    author: string;
    component: string;
    project: string;
    creationDate: string;
    updateDate: string;
  }
  
  type IssuesResponse = {
    total: number;
    p: number;
    ps: number;
    issues: Issue[];
  }
  
  type SearchParams = {
    componentKeys?: string;
    statuses?: string;
    severities?: string;
    types?: string;
    pageIndex?: number;
    pageSize?: number;
  }

export class SonarQubeClient {
    private apiClient: AxiosInstance;

    constructor(baseURL: string, authToken: string) {
        this.apiClient = axios.create({
            baseURL,
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
            },
        });
    }

    public async searchIssues(params: SearchParams): Promise<IssuesResponse> {
        try {
            const response = await this.apiClient.get('/api/issues/search', { params });
            return response.data as IssuesResponse;
        } catch (error) {
            throw new Error(`Error fetching issues: ${error}`);
        }
    }
}