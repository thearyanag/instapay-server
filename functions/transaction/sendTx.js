const {
    Connection,
    PublicKey,
    Keypair,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL,
    sendAndConfirmTransaction
} = require("@solana/web3.js");
const base58 = require("bs58");
require('dotenv').config()
let token = process.env.HELIUS_KEY;
let connection = new Connection(`https://rpc-devnet.helius.xyz/?api-key=${token}`);

/**  
 * To transfer a token from one wallet to another
 * @returns {Promise<{signature: string}>}
 */
async function sendTx(recipientWalletAddress,amount,secret) {
    console.log("recipientWalletAddress: ", recipientWalletAddress);
    console.log("amount: ", amount);
    console.log("secret: ", secret);
    secret = new Uint8Array(base58.decode(secret));
    let senderWallet = Keypair.fromSecretKey(secret);

    let to = new PublicKey(recipientWalletAddress);

    let transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: senderWallet.publicKey,
            toPubkey: to,
            lamports: LAMPORTS_PER_SOL * amount,
        })
    );

    let signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [senderWallet]
    );

    let transfer_trx = signature;
    console.log(transfer_trx)
    return {
        signature: transfer_trx,
    }

}

module.exports = sendTx;