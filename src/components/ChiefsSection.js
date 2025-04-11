import { useSelector } from "react-redux";
import { selectChiefs } from "../redux/slices/chiefSlice";
import ChiefCard from "./ChiefCard";

export default function ChiefsSection() {
    const chiefs = useSelector(selectChiefs);

    return (
        <div className="section chiefs">
            <h1 className="title">Our Top Chiefs</h1>
            <div className="top-chiefs-container">
                {chiefs.map((chief) => (
                    <ChiefCard key={chief.name} chief={chief} />
                ))}
            </div>
        </div>
    );
}
