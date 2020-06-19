import { useEffect} from 'react';
import Gallery from 'react-grid-gallery'

const ArtGallery = props => {
    const tagStyle = {
        color: "rgba(255, 255, 255, 1)",
        fontWeight: "500",
        fontSize: "13px",
        textTransform: "capitalize",
        backgroundColor:"rgba(0, 0, 0, .5)",
        borderRadius: "2px"
    }
    useEffect(()=>{
        
    },[])
    return(
            <div className="container-fluid"> 
                <div className="row">
                    <div className="col-12">
                        <div>
                            <Gallery
                                tagStyle={tagStyle}
                                margin={9}
                                rowHeight={250}
                                images={
                                    props.array.slice(0, props.limit).map((img,i) => { 
                                        return img
                                    })
                                }
                                enableImageSelection={false} /> 
                        </div>
                    </div>
                </div>
            </div>
        )
    }

export default ArtGallery