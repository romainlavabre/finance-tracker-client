import {Editor} from "react-draft-wysiwyg";
import React, {Component} from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import EditorState from "draft-js/lib/EditorState";
import isNull from "../../../mixin/global/isNull";
import ContentState from "draft-js/lib/ContentState";
import {convertFromHTML, convertToRaw} from "draft-js";
import draftToHtmlPuri from "draftjs-to-html";

export default class TextEditor extends Component {
    constructor(props) {
        super(props);

        if (!isNull(props.defaultValue)) {
            this.state = {
                editorState: EditorState.createWithContent(
                    ContentState.createFromBlockArray(
                        convertFromHTML(props.defaultValue)
                    )
                ),
            };
        } else {
            this.state = {
                editorState: EditorState.createEmpty(),
            };
        }
    }

    onEditorStateChange: Function = (editorState) => {
        this.setState({
            editorState,
        });

        if (!isNull(this.props.onChange)) {
            this.props.onChange(draftToHtmlPuri(convertToRaw(this.state.editorState.getCurrentContent())))
        }
    };

    render() {
        const {editorState} = this.state;
        return (
            <Editor
                editorState={editorState}
                editorClassName={"border border-gray-700  text-sm leading-3"}
                toolbarClassName={"text-gray-900 border-none p-0 my-0"}
                editorStyle={{minHeight: '200px'}}
                toolbar={{
                    options: ['inline', "textAlign", "fontSize", "list", "link", "colorPicker", "emoji"],
                    link: {
                        options: ["link"],
                        popupClassName: "h-96 shadow-none overflow-none",
                        showOpenOptionOnHover: true,
                        defaultTargetOption: "https"
                    },
                    inline: {
                        inDropdown: true,
                        options: ['bold', 'italic', 'underline', 'strikethrough'],
                    },
                    textAlign: {
                        inDropdown: true,
                        className: "z-10",
                        options: ['left', 'center', 'justify']
                    },
                    list: {
                        inDropdown: true,
                        className: "z-10",
                        options: ["unordered", "ordered"]
                    },
                    colorPicker: {
                        popupClassName: "bg-default text-white h-96 shadow-none overflow-none"
                    },
                    emoji: {
                        popupClassName: "bg-default text-white h-96 shadow-none overflow-none"
                    }
                }}
                localization={{
                    locale: 'fr',
                }}
                onEditorStateChange={this.onEditorStateChange}
            />
        )
    }
}

/**
 export default function ({defaultValue}) {

 useEffect(() => {
 if (isNull(defaultValue)) return;

 setTimeout(() => {
 const elements = document.getElementsByClassName("rdw-editor-main");

 elements[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].innerHTML = defaultValue;

 console.log(elements[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0])
 }, 200)
 }, []);

 return (
 <Editor
 editorClassName={"border border-gray-700 h-96 text-sm leading-3"}
 toolbarClassName={"text-gray-900 border-none"}
 toolbar={{
 options: ['inline', "textAlign", "fontSize", "list", "link", "colorPicker", "emoji"],
 link: {
 options: ["link"],
 popupClassName: "h-96 shadow-none overflow-none",
 showOpenOptionOnHover: true,
 defaultTargetOption: "https"
 },
 inline: {
 inDropdown: true,
 options: ['bold', 'italic', 'underline', 'strikethrough'],
 },
 textAlign: {
 inDropdown: true,
 className: "z-0",
 options: ['left', 'center', 'justify']
 },
 list: {
 inDropdown: true,
 className: "z-0",
 options: ["unordered", "ordered"]
 },
 colorPicker: {
 popupClassName: "bg-default text-white h-96 shadow-none overflow-none"
 },
 emoji: {
 popupClassName: "bg-default text-white h-96 shadow-none overflow-none"
 }
 }}
 localization={{
 locale: 'fr',
 }}
 />
 );
 }
 */