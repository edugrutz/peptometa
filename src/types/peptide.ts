export interface IPeptideAntiCP {
	sequence_id: string;
	sequence: string;
	anticp_score: number;
}

export interface IPeptideMacrel {
	sequence_id: string;
	sequence: string;
	amp_family: string;
	amp_probability: number;
	hemolytic_probability: number;
}
