import React from "react"
import { Modal, ModalBody } from "reactstrap";
import helpers from "./helpers";
import styled from "styled-components";

const LoadWheel = styled.span`
  display: block;
  background: #ff0000;
  border: 15px solid #f3f3f3;
  border-top: 15px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
`;

class Lightbox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            currentImage: props.currentImage,
            loaderId: null
        };
        this.handleModalOpen = this.handleModalOpen.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.loadNextImage = this.loadNextImage.bind(this);
        this.loadPreviousImage = this.loadPreviousImage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState((prevState) => {
            return {
                loaderId: nextProps.AJAXCallInProgress ? prevState.loaderId : null,
                modal: nextProps.modal,
                currentImage: nextProps.currentImage
            }
        });
    }

    loadNextImage(e) {
        e.preventDefault();
        this.setState({
            loaderId: e.currentTarget.dataset.loaderId
        });
        this.props.loadNextImage(e)
    }

    loadPreviousImage(e) {
        e.preventDefault();
        this.setState({
            loaderId: e.currentTarget.dataset.loaderId
        });
        this.props.loadPreviousImage(e)
    }

    handleModalOpen(e) {
        e.preventDefault();
        this.props.handleModalOpen(e);
        this.toggleModal()
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        });
        this.props.toggleModal()
    }

    render () {

        const { modal, currentImage, loaderId } = this.state

        return (
            <React.Fragment>
                <Modal
                    isOpen={modal}
                    toggle={this.toggleModal}
                    className="lightBoxModal my-0">
                <div className="photoInfo h-100 d-flex align-content-center align-items-center"
                     style={{
                         width: "100%",
                         top: "0"
                     }}>
                    <a href="#"
                       data-id={currentImage.id}
                       data-loader-id="next"
                       className = { `next fa fa-chevron-right ${helpers.cssShowLoader(loaderId === "next")}` }
                       style={{
                           position: "absolute",
                           right: "7px"
                       }}
                       title="View next image"
                       onClick={this.loadNextImage}
                    >
                        <span className="loader">
                           <LoadWheel />
                       </span>
                    </a>

                    <br />
                    <a href="#"
                       data-id={currentImage.id}
                       data-loader-id="previous"
                       className = { `next fa fa-chevron-left ${helpers.cssShowLoader(loaderId === "previous")}` }
                       style={{
                           position: "absolute",
                           left: "13px"
                       }}
                       title='View next image'
                       onClick={this.loadPreviousImage}
                    >
                        <span className="loader">
                           <LoadWheel />
                       </span>
                    </a>
                </div>

                <div className="photoInfo">
                    <a className="fa fa-times" onClick={this.toggleModal} />

                    <br/>
                    <a href={currentImage.link_src}
                       className = "flickr fa fa-flickr"
                       title = 'View on Flickr'
                       target = '_blank'
                    />
                </div>


                <ModalBody>
                    <div className="image-wrapper">
                        <img src={currentImage.src} className="img-fluid" />
                    </div>
                </ModalBody>
            </Modal>

            </React.Fragment>
        );
    }
}

export default Lightbox
