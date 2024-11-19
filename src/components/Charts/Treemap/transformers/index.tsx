import { TreemapData } from "..";
import { TopJetton, TopPool, TopUser } from "../../../../api/types";

export const topPoolsToTreemapData = (topPools: TopPool[]): TreemapData[] => {
  const treemapData: TreemapData[] = topPools.map((topPool) => {
	  return {
		name: `${topPool.jettonInSymbol} - ${topPool.jettonOutSymbol}`,
		url: `https://tonviewer.com/${topPool.poolAddress}`,
		usd: topPool.amountUsd,
		dex: topPool.dex,
		size: (topPool.amountUsd),
	  }
  })

  return treemapData.sort((a, b) => b.usd - a.usd)
}

export const topJettonsToTreemapData = (topJettons: TopJetton[]): TreemapData[] => {
  const treemapData: TreemapData[] = topJettons.map((topJetton) => {
	  return {
		name: topJetton.jettonSymbol,
		url: `https://tonviewer.com/${topJetton.jettonAddress}`,
		usd: topJetton.jettonUsd,
		size: topJetton.jettonUsd,
	  }
  })

  return treemapData.sort((a, b) => b.usd - a.usd)
}

export const topUsersToTreemapData = (topUsers: TopUser[]): TreemapData[] => {
  const treemapData: TreemapData[] = topUsers.map((topUser) => {
	  return {
		name: topUser.shortUserAddress,
		url: `https://tonviewer.com/${topUser.userAddress}`,
		usd: topUser.amountUsd,
		size: topUser.amountUsd,
	  }
  })

  return treemapData.sort((a, b) => b.usd - a.usd)
}
