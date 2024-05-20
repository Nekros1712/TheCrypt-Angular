import { Injectable } from '@angular/core'
import axios from 'axios'

@Injectable({
  providedIn: 'root'
})
export class ApiDataService {

  apiUrl: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=40&page=1&sparkline=false&locale=en'
  apiOptions: any = {
    headers: {
      "x-cg-demo-api-key": "CG-LnS5zdwGCPMwcT7bzfWPuZRW"
    }
  }
  dropdownData: any = {
    Bitcoin: 'bitcoin',
    Ethereum: 'ethereum',
    Tether: 'tether',
    BNB: 'binancecoin',
    Solana: 'solana',
    USDC: 'usd-coin',
    'Lido Staked Ether': 'staked-ether',
    XRP: 'ripple',
    Toncoin: 'the-open-network',
    Dogecoin: 'dogecoin',
    Cardano: 'cardano',
    'Shiba Inu': 'shiba-inu',
    Avalanche: 'avalanche-2',
    TRON: 'tron',
    'Wrapped Bitcoin': 'wrapped-bitcoin',
    Chainlink: 'chainlink',
    Polkadot: 'polkadot',
    'Bitcoin Cash': 'bitcoin-cash',
    'NEAR Protocol': 'near',
    Polygon: 'matic-network',
    Litecoin: 'litecoin',
    'Internet Computer': 'internet-computer',
    Uniswap: 'uniswap',
    'Fetch.ai': 'fetch-ai',
    'LEO Token': 'leo-token',
    Dai: 'dai',
    'Ethereum Classic': 'ethereum-classic',
    Render: 'render-token',
    Hedera: 'hedera-hashgraph',
    Pepe: 'pepe',
    'Wrapped eETH': 'wrapped-eeth',
    Aptos: 'aptos',
    'First Digital USD': 'first-digital-usd',
    Immutable: 'immutable-x',
    Cronos: 'crypto-com-chain',
    'Cosmos Hub': 'cosmos',
    Arweave: 'arweave',
    Mantle: 'mantle',
    Stellar: 'stellar',
    Filecoin: 'filecoin',
    'Renzo Restaked ETH': 'renzo-restaked-eth',
    'The Graph': 'the-graph',
    OKB: 'okb',
    Stacks: 'blockstack',
    Kaspa: 'kaspa',
    Optimism: 'optimism',
    dogwifhat: 'dogwifcoin',
    Fantom: 'fantom',
    Sui: 'sui',
    Arbitrum: 'arbitrum',
    Maker: 'maker',
    Bittensor: 'bittensor',
    VeChain: 'vechain',
    'Ethena USDe': 'ethena-usde',
    Injective: 'injective-protocol',
    Monero: 'monero',
    THORChain: 'thorchain',
    'Theta Network': 'theta-token',
    FLOKI: 'floki',
    'Rocket Pool ETH': 'rocket-pool-eth',
    Bonk: 'bonk',
    Jupiter: 'jupiter-exchange-solana',
    Celestia: 'celestia',
    Core: 'coredaoorg',
    GALA: 'gala',
    Sei: 'sei-network',
    'Lido DAO': 'lido-dao',
    'Bitget Token': 'bitget-token',
    'Mantle Staked Ether': 'mantle-staked-ether',
    Algorand: 'algorand',
    'WhiteBIT Coin': 'whitebit',
    Quant: 'quant-network',
    Ondo: 'ondo-finance',
    Flow: 'flow',
    'Bitcoin SV': 'bitcoin-cash-sv',
    'Akash Network': 'akash-network',
    Beam: 'beam-2',
    Aave: 'aave',
    SingularityNET: 'singularitynet',
    BitTorrent: 'bittorrent',
    Flare: 'flare-networks',
    dYdX: 'dydx-chain',
    Cheelee: 'cheelee',
    Ethena: 'ethena',
    'Marinade Staked SOL': 'msol',
    'Zebec Protocol': 'zebec-protocol',
    Chiliz: 'chiliz',
    NEO: 'neo',
    'Axie Infinity': 'axie-infinity',
    Gate: 'gatechain-token'
  }
  cachedCoinData: any = {}
  isFirstRequest = true
  cachedHourlyData: any = {}

  createDropdownMap(cachedCoinsList: any[]): Map<string, string> {
    const dropdownMap = new Map<string, string>();

    cachedCoinsList.forEach((coin) => {
      dropdownMap.set(coin.name, coin.id);
    });

    return dropdownMap;
  }

  constructor() { }

  private formatter(timestamp: string) {
    var date = new Date(timestamp).getDate()
    var month = new Date(timestamp).getMonth() + 1
    var hour = new Date(timestamp).getHours()
    return date + "/" + month + ": " + hour;
  }

  private bigNumFormat(num: number, digits: number) {

    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" }
    ]

    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
    var item = lookup.slice().reverse().find(item => num >= item.value)

    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + " " + item.symbol : "0"
  }

  private getData(coin: string) {
    return axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=2`, this.apiOptions)
  }

  getCoinsList() {
    return new Promise((resolve, reject) => {
      try {
        axios.get(this.apiUrl, this.apiOptions).then(res => {
          resolve(res.data)
        })
      } catch (error) {
        reject()
      }
    })
  }

  getChartData(coin: string) {
    return new Promise((resolve, reject) => {
      try {
        let time: any = []
        let price: any = []
        this.getData(coin.toLocaleLowerCase())
          .then(res => {
            res.data.prices.map((item: any) => {
              time.push(this.formatter(item[0]))
              price.push(item[1])
              return null
            })
            resolve({ time, price })
          })
      } catch (error) {
        reject()
      }
    })
  }

  getCoinData(coin: string) {
    return new Promise((resolve, reject) => {
      try {
        let data = {}
        axios.get("https://api.coingecko.com/api/v3/coins/" + coin.toLocaleLowerCase() + "/", this.apiOptions)
          .then(res => {
            const obj = res.data
            const marketData = obj.market_data
            const cap = marketData.market_cap.usd || ''
            const circ = marketData.circulating_supply || ''
            const tot = marketData.total_supply || ''

            data = {
              marketRank: obj.market_cap_rank,
              currentPrice: marketData.current_price.usd || 0,
              marketCap: this.bigNumFormat(parseFloat(cap), cap.length),
              circSupply: this.bigNumFormat(parseFloat(circ), circ.length),
              totalSupply: (tot !== null) ? this.bigNumFormat(parseFloat(tot), tot.length) : "na",
              percentChange: {
                day: Number(marketData.price_change_percentage_24h),
                week: Number(marketData.price_change_percentage_7d),
                month: Number(marketData.price_change_percentage_30d),
                year: Number(marketData.price_change_percentage_1y)
              }
            }
            resolve({ data })
          })
      } catch (error) {
        reject()
      }
    })
  }

  getDropdownList() {
    return this.dropdownData
  }
}
