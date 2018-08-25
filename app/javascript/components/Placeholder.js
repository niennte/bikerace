import React from "react"

class Placeholder extends React.Component {

    buildSrc() {
        let image = this.props.image;
        let src = null;
        let layout = this.props.layout
        switch(layout) {
            case "masonry": {
                src = image.orientation === "landscape" ?
                    `//placehold.it/${image.width}x${image.height}/000` :
                    `//placehold.it/${image.width}x${(image.height * 0.6)}/000`;
                break;
            }
            case "boxed": {
                src = image.orientation === "landscape" ?
                    `//placehold.it/${image.width}x${image.height}/000` :
                    `//placehold.it/${image.height}x${(image.width)}/000`;
                break;
            }
            case "square": {
                src = image.orientation === "landscape" ?
                    `//placehold.it/${image.width}x${image.width}/000` :
                    `//placehold.it/${image.height}x${(image.height)}/000`;
                break;
            }
            default: {
                src = image.orientation === "landscape" ?
                    `//placehold.it/${image.width}x${image.height}/000` :
                    `//placehold.it/${image.width}x${(image.height * 0.6)}/000`;
            }
        }
        return src;
    }

    buildMeta() {
        return this.props.image.title;
    }

    render () {

        return (
            <React.Fragment>
                <img className={this.props.className}
                     src={this.buildSrc()}
                     alt={this.buildMeta()} />
            </React.Fragment>
        );
    }
}

export default Placeholder
