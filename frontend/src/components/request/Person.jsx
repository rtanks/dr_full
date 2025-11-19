import { useState } from "react";
import ToggleSelectMyself from "./ToggleSelectMyself";

const Persons = ({getForMyself}) => {
    const [active, setActive] = useState("formyself");

    const personsList = [
        { id: "formyself", text: "برای خودم" },
        { id: "foranother", text: "برای دیگری" },
    ];

    return (
        <ToggleSelectMyself
            getForMyself={getForMyself}
            items={personsList}
            active={active}
            onChange={setActive}
        />
    );
};

export default Persons;
