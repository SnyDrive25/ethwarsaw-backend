const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(req.body);
  const {
    RequestNetwork,
    Types,
    Utils,
  } = require("@requestnetwork/request-client.js");
  const {
    EthereumPrivateKeySignatureProvider,
  } = require("@requestnetwork/epk-signature");
  const { config } = require("dotenv");

  // Load environment variables from .env file (without overriding variables already set)
  config();
/*
  const epkSignatureProvider = new EthereumPrivateKeySignatureProvider({
    method: Types.Signature.METHOD.ECDSA,
    privateKey: process.env.PAYEE_PRIVATE_KEY, // Must include 0x prefix
  });
*/
  const requestClient = new RequestNetwork({
    nodeConnectionConfig: {
      baseURL: "https://goerli.gateway.request.network/",
    },
    signatureProvider: req.body.epkSignatureProvider,
  });

  // In this example, the payee is also the payer and payment recipient.
  const payeeIdentity = "0x04a02eb067D6CDC7e4f4C1b112456C94EC38Dd40";
  const payerIdentity = payeeIdentity;
  const paymentRecipient = payeeIdentity;
  const feeRecipient = "0x0000000000000000000000000000000000000000";

  const requestCreateParameters = {
    requestInfo: {
      currency: {
        type: Types.RequestLogic.CURRENCY.ERC20,
        value: "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9",
        network: "alfajores",
      },
      expectedAmount: "10",
      payee: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payeeIdentity,
      },
      payer: {
        type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
        value: payerIdentity,
      },
      timestamp: Utils.getCurrentTimestampInSecond(),
    },
    paymentNetwork: {
      id: Types.Extension.PAYMENT_NETWORK_ID.ERC20_FEE_PROXY_CONTRACT,
      parameters: {
        paymentNetworkName: "alfajores",
        paymentAddress: paymentRecipient,
        feeAddress: feeRecipient,
        feeAmount: "0",
      },
    },
    contentData: {
      reason: "🍕",
      dueDate: "2023.06.16",
    },
    signer: {
      type: Types.Identity.TYPE.ETHEREUM_ADDRESS,
      value: payeeIdentity,
    },
  };

  const request = await requestClient.createRequest(requestCreateParameters);
  const requestData = await request.waitForConfirmation();
  console.log(JSON.stringify(requestData));

  res.send(JSON.stringify(requestData));
});

module.exports = router;