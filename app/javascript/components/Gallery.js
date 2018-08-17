import React from "react"
import PropTypes from "prop-types"
import Pagination from "./Pagination"
import axios from "axios"

// @TODO: refactor into a components image placeholder and image info - enable dynamic layout change
// @TODO refactor the modal and lightbox using reactstrap - enable gallery

class Gallery extends React.Component {

    constructor(props) {
        super(props)

        this.SERVICE_PATH = props.service

        this.state = {
            flickr: props.flickr
        };
        this.getPage = this.getPage.bind(this);
    }

    getPage(path = null) {
        path = path || this.SERVICE_PATH
        let url = new URL(path);
        let service = url.protocol + "//" + url.host + url.pathname + ".json" + url.search;
        axios.get(service)
            .then(res => {
                const flickr = res.data;
                this.setState({ flickr });
                window.history.pushState({path:path},"",path);
            });
    }

  render () {

    const { flickr } = this.state

    return (
      <React.Fragment>
      <div className = "container">
          <Pagination
              getPage = {this.getPage}
              collection = {flickr} />
      </div>
      <div className="container-fluid p-0 photos">
          <div className="card-columns">
              {flickr.collection.map((image, i) => {
                  const className = `card b-0 p-0 ${image.orientation} height-${image.height} width-${image.width}`;
                  const style = {
                      backgroundImage: `url(${image.src})`
                  };
                  const placeholderSrc = image.orientation == 'landscape' ? `//placehold.it/${image.width}x${image.height}/000` : `//placehold.it/${image.height}x${image.width}/000`
                  return (
                      <div className={className} style={style} key={i}>
                        <img className = "card-img-top img-fluid b-0 m-0 p-0" src={placeholderSrc} alt="" />

                          <div className="photoInfo">
                              <a href="#"
                                 title="View larger image"
                                 className="zoom fa fa-search "
                                 data-toggle="modal"
                                 data-target=".modal-profile-lg" >
                                  <img className="img-fluid" src={image.src} />
                              </a>
                              <br/>
                              <a href={image.link_src}
                                 className = "flickr fa fa-flickr"
                                 title = 'View on Flickr'
                                 target = '_blank' />
                          </div>
                      </div>
                  );
              })}
          </div>
      </div>
      </React.Fragment>
    );
  }
}

Gallery.propTypes = {
  greeting: PropTypes.string
};
export default Gallery
