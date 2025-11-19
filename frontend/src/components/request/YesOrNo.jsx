import ToggleSelect from "./ToggleSelect";

const YesNo = ({ active, onChange }) => {
    const yesNoList = [
        { id: "no", text: "خیر" },
        { id: "yes", text: "بله" },
    ];

    return (
        <ToggleSelect
            items={yesNoList}
            active={active}
            onChange={onChange}
        />
    );
};

export default YesNo;
