import {getNflSchedule} from './request'

interface GetNflScheduleDataProps {
	seasonYear: number;
}

export const getNflScheduleData = async ({ seasonYear }: GetNflScheduleDataProps) => {
	const requestData = await getNflSchedule({ seasonYear });
	
}
