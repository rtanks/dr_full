import HistoryItem from "./HistoryItem";

export default function HistoryDoctor () {
    return (
        <div className="w-full h-max bg-white rounded-2xl flex flex-col gap-2 p-1">
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
            <HistoryItem/>
        </div>
    )
}