import React from "react";
import style from "./tab.module.scss";

interface TabProps {
    header: string;
    content: React.ReactNode;
}

interface TabComponentProps {
    tabs: TabProps[];
}

export const Tab = ({ tabs }: TabComponentProps) => {
    const [activeTabIndex, setActiveTabIndex] = React.useState(0);

    const handleTabChange = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <div className={style.tabComponent}>
            <ul className={style.tabList}>
                {tabs.map((tab, index) => (
                    <li key={index} className={activeTabIndex === index ? style.active : style.inactive}>
                        <h4><a className={style.tab_header} onClick={() => handleTabChange(index)}>{tab.header}</a></h4>
                    </li>
                ))}
            </ul>
            <div className={style.tabContentContainer}>
                {tabs.map((tab, index) => (
                    activeTabIndex === index ? (
                        <div key={index}>
                            <div className={style.tab_content}>{tab.content}</div>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
};