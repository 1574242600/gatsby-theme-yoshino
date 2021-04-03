import React, { useEffect, useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import ContactStyle from "./style/contacts.module.css";
import Contact from "./contacts/contact";
import Icon from "../../global/icon";
import { isMobile as getIsMobile } from "../../../global";

function getContactUrl(name, id) {
    const urls = {
        github: `https://github.com/${id}`,
        telegram: `https://t.me/${id}`,
        //fuck qq
        qq: [
            `mqqwpa://im/chat?chat_type=wpa&uin=${id}&version=1&src_type=web`,
            `tencent://message/?uin=${id}&Site=&Menu=yes`
        ],

        twitter: `https://twitter.com/${id}`,
    };

    return urls[name] ? urls[name] : null;
}

function renderContact(name, url) {
    return (
        <Contact key={ name } title={ name } url={ url }>
            <Icon
                path={ `/logo/${name}` }
            />
        </Contact>
    );
}

export default function Contacts() {
    const { site: { siteMetadata: { contacts } } } = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                contacts {
                    id 
                    name
                    url
                }
              }
            }
          }
        `
    );

    const [ isMobile, setIsMobile ] = useState(undefined);

    useEffect(() => {
        setIsMobile(getIsMobile());
    }, []);

    const render = contacts.map((contact) => {
        const { id, name, url } = contact;
        if (name === null) { return undefined; }

        if (typeof id === "string" && url === null) {
            if ( name === "qq" ) {
                return renderContact(name, getContactUrl(name, id)[ isMobile ? 0 : 1 ]);
            }

            return renderContact(name, getContactUrl(name, id));
        } else {
            const { name, url } = contact;
            return renderContact(name, url);
        }
    }).filter((renderContact) => renderContact !== undefined);

    return (
        <div className={ ContactStyle.contacts }>
            { render }
        </div>
    );
}
