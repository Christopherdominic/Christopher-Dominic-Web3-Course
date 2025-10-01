const contractAddress = "0x35cd167FA931C6c5E07AbB2621846FC35D54baD6";
const abi = [
    "function vote(uint256 proposal) external"
];

async function vote(proposal) {
    if (!signer) {
        alert("Please connect your wallet first!");
        return;
    }

    try {
        const contract = new ethers.Contract(contractAddress, abi, signer);
        const tx = await contract.vote(proposal);

        document.getElementById("voteStatus").innerText =
            `⏳ Voting... Hash: ${tx.hash}`;
        await tx.wait();
        document.getElementById("voteStatus").innerText =
            `✅ Successfully voted for Proposal ${proposal}`;
    } catch (error) {
        document.getElementById("voteStatus").innerText = `❌ Error: ${error.message}`;
    }
}

document.getElementById("vote1").onclick = () => vote(1);
document.getElementById("vote2").onclick = () => vote(2);
