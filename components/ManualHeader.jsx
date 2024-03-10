import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function ManualHeader() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } = useMoralis()

    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof windows !== "undefined") {
            if (window.localStorage.getItem("connected")) enableWeb3()
        }
    }, [isWeb3Enabled]) //if anything in this array changes, then the function will be run and page re-rendered
    // no dependency array - runs everytime something re-renders - CAREFUL!

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("null account found")
            }
        })
    }, [])

    return (
        <div>
            {account ? (
                <div>Connected to {account}</div>
            ) : (
                <button
                    disabled={isWeb3EnableLoading}
                    onClick={async () => {
                        await enableWeb3()
                        if (typeof windows !== "undefined") window.localStorage.setItem("connected", "injected")
                    }}
                >
                    Connect
                </button>
            )}
        </div>
    )
}
