const LOCK_TIME=180
const MINVALUES=100
const DECIMAL=8
const CONFRIMATION=5
const INITIAL_ANSWER=400000000000
const deploymentsChainId = ["hardhat","local"]
const networkConfig={
    11155111:{
        ethUsdDataFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }
}
module.exports= {
    LOCK_TIME,
    MINVALUES,
    DECIMAL,
    INITIAL_ANSWER,
    networkConfig,
    deploymentsChainId,
    CONFRIMATION
}