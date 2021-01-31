import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ContactStyle from "./style/contacts.module.css";
import Contact from "./contacts/contact";
import Icon from "../../global/icon";
import { isMobile } from "../../../global";

function getContactUrl(name, id) {
    const urls = {
        github: `https://github.com/${id}`,
        telegram: `https://t.me/${id}`,
        //fuck qq
        qq:  isMobile() 
            ? `mqqwpa://im/chat?chat_type=wpa&uin=${id}&version=1&src_type=web`
            : `tencent://message/?uin=${id}&Site=&Menu=yes`,

        twitter: `https://twitter.com/${id}`,
    };

    return urls[name] ? urls[name] : null;
}

function renderContact(name, url) {
    return (
        <Contact key={ name } title={ name } url={ url }>
            <Icon 
                src={ `/logo/${name}` } 
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

    const render =  contacts.map((contact) => {
        const { id, name, url } = contact;
        if (name === null) { return undefined; }

        if (typeof id === "string" && url === null) {
            return renderContact(name, getContactUrl(name, id));
        } else {
            const { name, url } = contact;
            return renderContact(name, url);
        }
    }).filter((renderContact) => renderContact !== undefined );

    return (
        <div className={ ContactStyle.contacts }> 
            { render }
        </div>
    );
}
