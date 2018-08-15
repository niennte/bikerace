import React from "react"
import PropTypes from "prop-types"

// @TODO: refactor into a components image placeholder and image info
// @TODO refactor the modal and lightbox using reactstrap

class HelloWorld extends React.Component {
    constructor(props) {
        super(props)
    }
  render () {
    return (
      <React.Fragment>
        <h1>Photos</h1>
        <p>Page: {this.props.collection.page}</p>
        <p>Par page: {this.props.collection.perpage}</p>
        <p>Pages: {this.props.collection.pages}</p>
        <p>Has next: {this.props.collection.has_next_page ? 'true' : 'false'}</p>
        <p>Has previous: {this.props.collection.has_previous_page ? 'true' : 'false'}</p>
        <p>Collection: {this.props.collection.collection.length}</p>

          <div className="container-fluid py-5 photos">
              <div className="card-columns">
                  {this.props.collection.collection.map((image, i) => {
                      const className = `card b-0 p-0 ${image.orientation} height-${image.height} width-${image.width}`;
                      const style = {
                          backgroundImage: `url(${image.src})`
                      };
                      const placeholderSrc = image.orientation == 'landscape' ? `//placehold.it/${image.width}x${image.height}/000` : `//placehold.it/${image.width}x${image.width}/000`
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

HelloWorld.propTypes = {
  greeting: PropTypes.string
};
export default HelloWorld
