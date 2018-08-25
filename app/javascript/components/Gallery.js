import React from "react"
import axios from "axios"

import Pagination from "./Pagination"
import Lightbox from "./Lightbox"
import ImageInfo from "./ImageInfo"
import Placeholder from "./Placeholder"


class Gallery extends React.Component {

    constructor(props) {
        super(props);

        this.SERVICE_PATH = props.service;

        this.direction = "next";
        this.servicePath = "";
        this.browserPath = "";

        this.state = {
            flickr: this.indexImages(props.flickr),
            modal: false,
            currentImage: {},
            AJAXCallInProgress: false,
            layout: "masonry"
        };
        this.getPage = this.getPage.bind(this);
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.loadNextImage = this.loadNextImage.bind(this);
        this.loadPreviousImage = this.loadPreviousImage.bind(this);
    }

    indexImages(flickr) {
        flickr.collection = flickr.collection.map((image, i) => {
            image.id = i;
            return image
        });
        return flickr
    }

    pageToLoad() {
        let page;
        switch (this.direction) {
            case "next": {
                page = this.state.flickr.page + 1;
                break;
            }
            case "previous": {
                page = this.state.flickr.page - 1;
                break;
            }
            default: {
                page = this.state.flickr.page;
            }
        }
        return page;
    }

    buildPaths(url, search) {
        this.servicePath = url.protocol + "//" + url.host + url.pathname + ".json" + search;
        this.browserPath = url.protocol + "//" + url.host + url.pathname + search;
    }

    getPage(page, pageSize) {
        // make module portable
        const url = new URL(window.location);
        page = page || this.state.flickr.page;
        pageSize = pageSize || this.state.flickr.page_size;
        const search = "?" + "page=" + page + "&page_size=" + pageSize;
        this.buildPaths(url, search);

        axios.get(this.servicePath)
            .then(response => {
                const flickr = this.indexImages(response.data);
                this.setState({flickr});
                window.history.pushState({path: this.browserPath}, "", this.browserPath);
                this.handleLighboxOnPageLoaded()
            });
    }

    handleLighboxOnPageLoaded() {
        // if going forward start from the beginning of the next page
        let imageId = 0;
        if (this.direction === "previous") {
            // if going backward start from the end of the previous page
            imageId = this.state.flickr.collection.length - 1
        }
        const currentImage = this.state.flickr.collection[imageId];
        // update lightbox image and let module know load is complete
        this.setState({
            currentImage: currentImage,
            AJAXCallInProgress: false
        });
    }

    loadImage(imageID) {
        // try to get the image from current page
        let currentImage = this.state.flickr.collection[imageID];
        // if none to be found
        // let modules know and reach for another page
        if (!currentImage) {
            this.setState({
                AJAXCallInProgress: true
            });
            this.getPage(this.pageToLoad());
        } else {
            this.setState({
                AJAXCallInProgress: false,
                currentImage: currentImage
            });
        }
    }

    loadNextImage(e) {
        e.preventDefault();
        let id = parseInt(e.currentTarget.dataset.id) + 1;
        this.direction = "next";
        this.loadImage(id)
    }

    loadPreviousImage(e) {
        e.preventDefault();
        let id = parseInt(e.currentTarget.dataset.id) - 1;
        this.direction = "previous";
        this.loadImage(id)
    }

    handleModalOpen(e) {
        e.preventDefault();
        let id = e.currentTarget.dataset.id;
        let currentImage = this.state.flickr.collection[id];
        this.setState({
            currentImage: currentImage
        });
        this.toggleModal()
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {

        const {flickr, modal, currentImage, AJAXCallInProgress, layout} = this.state;

        return (
            <React.Fragment>

                <div className="container">

                    <Pagination
                        getPage={this.getPage}
                        AJAXCallInProgress={AJAXCallInProgress}
                        collection={flickr}/>
                </div>

                <div className="container p-0 photos">

                    <div className={`card-columns ${layout}`}>

                        { flickr.collection.map((image, i) => {

                                return (
                                    <div
                                        style = {{
                                            backgroundImage: `url(${image.src})`
                                        }}
                                        className = { `card b-0 p-0 ${image.orientation}` }
                                        key={i} >

                                        <Placeholder
                                            className = "card-img-top img-fluid b-0 m-0 p-0"
                                            layout={layout}
                                            image={image} />

                                        <ImageInfo
                                            className="photoInfo"
                                            image={image}
                                            handleModalOpen={this.handleModalOpen} />
                                    </div>
                                );

                            }) }

                    </div>

                </div>

                <Lightbox
                    modal={modal}
                    currentImage={currentImage}
                    AJAXCallInProgress={AJAXCallInProgress}
                    handleModalOpen={this.handleModalOpen}
                    toggleModal={this.toggleModal}
                    loadNextImage={this.loadNextImage}
                    loadPreviousImage={this.loadPreviousImage} />

            </React.Fragment>
        );
    }
}

export default Gallery
