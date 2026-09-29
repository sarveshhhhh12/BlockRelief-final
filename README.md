# BlockRelief

BlockRelief is a hackathon-ready disaster-relief prototype for tracking donations, resource movement, relief-center inventory and public verification. The intended architecture is React/Vite → Express/MongoDB, with Solidity/Ethers for verifiable blockchain events.

The implementation deliberately does **not** invent MST network credentials. The MST testnet explorer is currently `https://testnet.mstscan.com/`; obtain the current RPC URL, chain ID and faucet instructions from official MST developer documentation before deployment. The explorer itself shows the MST Testnet and current chain activity. citeturn0search2

BridgeKey is an EVM-compatible wallet product; the frontend uses the standard EIP-1193 provider interface (`window.ethereum`) rather than requesting keys. EIP-1193 defines `request`, `accountsChanged`, `chainChanged`, `connect`, and `disconnect` provider behavior. citeturn0search0turn0search6

## Structure

- `frontend/` React + Vite UI, wallet adapter, maps, QR generation, charts
- `backend/` Express + Mongoose REST API
- `blockchain/` Hardhat + Solidity contract/tests

## Prerequisites

Node.js 20+, MongoDB, a browser EVM wallet such as BridgeKey, and (for live blockchain mode) current MST testnet RPC/chain ID plus a funded testnet account.

## Install

```bash
cd BlockRelief
npm install
npm run install:all
```

Create env files from the examples:

```bash
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
cp blockchain/.env.example blockchain/.env  # if you create one locally
```

Set `MST_RPC_URL`, `MST_CHAIN_ID`, `VITE_MST_EXPLORER_URL` and contract address only from current official MST configuration. Never put a private key in `frontend/.env`.

## Database

Start MongoDB, then optionally seed the requested demo dataset:

```bash
cd backend
npm run seed
```

Add to `backend/package.json` if needed:

```json
"seed":"node seed.js"
```

The seed creates 3 campaigns, 5 centers, 10 resources, 20 resource events, 10 donations and 5 expenses, all clearly marked DEMO DATA.

## Smart contract

```bash
cd blockchain
npm install
npx hardhat compile
npx hardhat test
```

For local Hardhat deployment:

```bash
npx hardhat node
# in another terminal, with localhost config selected
npx hardhat run scripts/deploy.js --network hardhat
```

For MST testnet, put the current official values in `blockchain/.env`, then:

```bash
npx hardhat run scripts/deploy.js --network mst
```

Copy the printed address into `frontend/.env` as `VITE_CONTRACT_ADDRESS` and `backend/.env` as `CONTRACT_ADDRESS`.

## Run

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

Open the Vite URL shown in the terminal.

## Live donation flow

1. Start MongoDB and the backend.
2. Deploy `BlockRelief.sol` to the configured MST testnet.
3. Configure the contract address and explorer URL.
4. Connect BridgeKey.
5. Open Chennai Flood Relief.
6. Enter a positive testnet MSTC amount.
7. Confirm in the wallet.
8. The UI waits for `tx.wait()` before calling the donation API.
9. The transaction hash is stored in MongoDB and the transaction page builds the MSTScan URL from `VITE_MST_EXPLORER_URL`.

No fake transaction is created by the application.

## Public verification

- `/resource/FOOD-001` and `/verify/FOOD-001` show resource status/history.
- `/transaction/<hash>` shows the hash and, when configured, an MSTScan verification link.

## Shortage logic

The UI follows the specified simple threshold model: >50% sufficient, 20–50% low, <20% critical. The demo cards use the same concept for quick presentation.

## Known limitations

- The QR generator is fully wired; the scanner page includes a reliable manual Resource ID fallback. Camera scanning should be added with `html5-qrcode` if the demo environment permits camera permissions.
- MongoDB is required for persistence; the frontend contains demo fallback data so UI routes remain explorable if the API is temporarily unavailable.
- Live MST values are intentionally configuration-driven rather than guessed.
- The contract records native payable MSTC. If MST's current developer docs require a different token standard for test MSTC, adapt the isolated donation method before deployment.

## Hackathon demo

Connect wallet → Campaigns → Chennai Flood Relief → Donate test MSTC → confirm in wallet → show hash/MSTScan → Resources → register FOOD-001 → show QR → open resource → advance status → Relief Centers → show map and shortage colors → Analytics → Transactions/Public verification.

## Security

Never enter a seed phrase/private key into BlockRelief. Do not commit `.env`. Use testnet funds only. Beneficiary PII and large documents are intentionally off-chain.
