import { SideBarElementType } from '@/types/side-bar-element-type';
import SideBarElement from './SideBarElement';

export default function SideBarCategory({
    title,
    elements,
}: Readonly<{
    title: string;
    elements: SideBarElementType[];
}>) {
    return (
        <div className="flex flex-col items-stretch">
            <h2 className="text-gray-500 font-semibold p-6">{title}</h2>
            <ul className="flex flex-col items-stretch px-2">
                {elements.map((element) => (
                    <SideBarElement key={element.name} element={element} />
                ))}
            </ul>
        </div>
    );
}
