import { SwapsDistribution } from "../types"

export type SwapDistributionBarEntry = {
	label: string,
	transactions: number
}

export const swapsDistributionToDataArray = (sd: SwapsDistribution): 
	SwapDistributionBarEntry[] =>  {
  return [
	{ label: "<1$", transactions: sd.usdRangeTo1 },
	{ label: "1-5$", transactions: sd.usdRange1To5 },
	{ label: "5-15$", transactions: sd.usdRange5To15 },
	{ label: "15-50$", transactions: sd.usdRange15To50 },
	{ label: "50-150$", transactions: sd.usdRange50To150 },
	{ label: "150-500$", transactions: sd.usdRange150To500 },
	{ label: "500-2000$", transactions: sd.usdRange500To2000 },
	{ label: ">2000$", transactions: sd.usdRangeFrom2000 },
]}
