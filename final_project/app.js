let provider;
let signer;

// Connect Wallet
document.getElementById("connectButton").onclick = async () => {
  try {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask!");
      return;
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = await provider.getSigner();

    const address = await signer.getAddress();
    document.getElementById("account").innerText = `Account: ${address}`;

    const balance = await provider.getBalance(address);
    document.getElementById("balance").innerText =
      `Balance: ${ethers.formatEther(balance)} ETH`;

    document.getElementById("connectButton").style.display = "none";
    document.getElementById("disconnectButton").style.display = "inline-block";

  } catch (error) {
    console.error(error);
    alert("Error connecting wallet: " + error.message);
  }
};

// Disconnect Wallet
document.getElementById("disconnectButton").onclick = () => {
  signer = null;
  provider = null;
  document.getElementById("account").innerText = "Account: Not connected";
  document.getElementById("balance").innerText = "Balance: -";
  document.getElementById("connectButton").style.display = "inline-block";
  document.getElementById("disconnectButton").style.display = "none";
};

// Send ETH
document.getElementById("sendButton").onclick = async () => {
  if (!signer) {
    alert("Please connect your wallet first!");
    return;
  }

  try {
    const recipient = document.getElementById("recipient").value;
    const amount = document.getElementById("amount").value;

    const tx = await signer.sendTransaction({
      to: recipient,
      value: ethers.parseEther(amount)
    });

    document.getElementById("status").innerHTML =
      `⏳ Transaction sent! <a href="https://sepolia.etherscan.io/tx/${tx.hash}" target="_blank">View on Etherscan</a>`;

    await tx.wait();

    document.getElementById("status").innerHTML =
      `✅ Confirmed! <a href="https://sepolia.etherscan.io/tx/${tx.hash}" target="_blank">View on Etherscan</a>`;

  } catch (error) {
    console.error(error);
    document.getElementById("status").innerText = `❌ Error: ${error.message}`;
  }
};