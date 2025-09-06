import { FloatingContainer, SelectButtons } from "@/components/ui";
export default function FloatingThemePicker({ e, value, setValue, className = "", children, ...props }) {
    return (
        <FloatingContainer {...props} >
            <SelectButtons className="w-[8rem]" value={value} setValue={setValue} options={["light", "dark"]}></SelectButtons>
        </FloatingContainer>
    );
}