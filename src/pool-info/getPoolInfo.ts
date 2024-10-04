import { initSdk } from "../config";


export class PoolInfo{
  async getPoolInfoWithSlot(poolId: string,type:string){
    const raydium = await initSdk()
    let poolInfo;
    let dataToSwap = {}
    if(type === 'amm'){
      const poolOri = await raydium.liquidity.getRpcPoolInfos([poolId])
      poolInfo = poolOri[poolId]
      dataToSwap = {
        base_reserve: parseInt(poolInfo.baseReserve.toString()),
        quote_reserve: parseInt(poolInfo.quoteReserve.toString()),
        pool_price:poolInfo.poolPrice
      }
    }else if(type === 'cpmm'){
      const poolOri = await raydium.cpmm.getRpcPoolInfos([poolId])
      poolInfo = poolOri[poolId]
      dataToSwap = {
        base_reserve: parseInt(poolInfo.baseReserve.toString()),
        quote_reserve: parseInt(poolInfo.quoteReserve.toString()),
        pool_price:poolInfo.poolPrice
      }
    }else{
      const poolOri = await raydium.clmm.getRpcClmmPoolInfos({poolIds:[poolId]})
      poolInfo = poolOri[poolId]
      dataToSwap = {
        tick_current:parseInt(poolInfo.tickCurrent),
        liquidity: parseInt(poolInfo.liquidity.toString()),
        sqrt_price_x64:parseInt(poolInfo.sqrtPriceX64.toString()),
        tick_array_bitmap:poolInfo.tickArrayBitmap.toString(),
        pool_price:poolInfo.currentPrice,
        slot:poolInfo.slot
      }
    }
    const poolState = {
      state:dataToSwap,
      slot:poolInfo['slot']
    }
    return poolState
  }
}
const pool = new PoolInfo();
pool.getPoolInfoWithSlot('3nMFwZXwY1s1M5s8vYAHqd4wGs4iSxXE4LRoUMMYqEgF','clmm')
