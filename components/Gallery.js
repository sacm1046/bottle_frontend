import { useEffect, useContext } from 'react';
import { Context } from '../store/appContext'
import Gallery from 'react-grid-gallery'

const ArtGallery = props => {
    const { actions } = useContext(Context)
    const tagStyle = { 
        color: "rgba(255, 255, 255, 1)", 
        fontWeight:"600",
        fontSize: "13px", 
        textTransform: "uppercase",
        backgroundColor: "rgba(0, 0, 0, .5)", 
        padding: "2px",
        borderRadius: "2px"
        
    } 
    useEffect(()=>{
        
    },[actions])
    return(
            <div className="container-fluid" >
                <div className="row">
                    <div className="col-md-12">
                        <div>
                            <Gallery
                                tagStyle={tagStyle}
                                margin={8}
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