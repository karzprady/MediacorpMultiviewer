const BCmodel = require("../model/BCschema");
const YTmodel = require("../model/YTschema");

const Adddetails = async (req,res)=>{
    try{
        const {title,videoentity, type} = req.body;
        console.log(title,videoentity,type);
    if(!title || !videoentity || !type){ 
        return res.status(400).json({message:"Please fill all the fields"});
    }
   
    
    if(type === "youtube"){
        const newVideo = new YTmodel({
            Title : title,
            VideoEntity : videoentity
         });
           await newVideo.save();
              return res.status(200).json({message:"Video added successfully"});
    }

    else if(type === "brightcove"){
        const newVideo = new BCmodel({
            Title : title,
            VideoEntity : videoentity
         });
           await newVideo.save();
              return res.status(200).json({message:"Video added successfully"});
    }
    else{
        return res.status(400).json({message:"Invalid type"});
    }
    }
   catch(err){
    console.log(err)
           return res.status(500).json({message:"Error adding video"});
    }
}

const GetAlldetails = async (req,res)=>{   
    try{
        const BCvideos = await BCmodel.find();
        const YTvideos = await YTmodel.find();
        
        return res.status(200).json({
            BCvideos,
            YTvideos
        })
    }catch(err){
        return res.status(500).json({message:"Error fetching videos"});
    }
}

const removeVideo = async (req,res)=>{  
    try{
        const {id,type} = req.params;
        if(!id || !type){
            return res.status(400).json({message:"Please provide id and type"});
        }
        if(type === "youtube"){
            await YTmodel.findByIdAndDelete(id);
            return res.status(200).json({message:"Video deleted successfully"});
        }
        else if(type === "brightcove"){
            await BCmodel.findByIdAndDelete(id);
            return res.status(200).json({message:"Video deleted successfully"});
        }
        else{
            return res.status(400).json({message:"Invalid type"});
        }
        
    }catch(err){
        return res.status(500).json({message:"Error deleting video"});
    }
}

module.exports = {
    Adddetails,
    GetAlldetails,
    removeVideo
}