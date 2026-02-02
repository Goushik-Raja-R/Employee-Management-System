const EmployeeModel = require('../models/Employee.models');

module.exports.GetAllEmployee = async(req,res)=>{

    try{
       const data = await EmployeeModel.find();
       res.status(200).json({
            success:true,
            count:data.length,
            data:data
       })
    }catch(error){
        res.status(500).json({
            success:false,
            message:'There is no Working HC data',
            error:error.message
        });
    }
};

module.exports.GetEmployeeByID= async(req,res)=>{

    try{
       const data = await EmployeeModel.findOne({empid:req.body.empid});

       if(!data){
           res.status(500).json({
            success:false,
            message:`${req.body.empid} is not found in Database`,
            });
        }
          res.status(200).json({
            success:true,
            count:data.length,
            data:data
            })
    }
    catch(error){
        res.status(500).json({
            success:false,
            message:"Error while Fetching HC Details",
            error:error.message
        });
    }
};


// module.exports.CreateEmployee = async(req,res)=>{
    
//     try{
//         const NewWorkingHC = new EmployeeModel({
//             name:req.body.name,
//             empid:req.body.empid,
//             designation:req.body.designation,
//             phonenumber:req.body.phonenumber,
//             age:req.body.age
//         })

//         const NewHC = await NewWorkingHC.save();

//         res.status(201).json({
//             success:true,
//             message:"New HC Created Successfully",
//             data:NewHC
//         })
//     }
//     catch(error){
//         res.status(400).json({
//             success:false,
//             message:"Error while creating Working HC",
//             error:error.message
//         })
//     }
// }


module.exports.UpdateEmployeeByID = async(req,res)=>{

    const empid = req.body.empid;

    try{
        const UpdatedHC = await EmployeeModel.findOneAndUpdate({empid},req.body,
            {
               new:true,
               runValidators:true
            }
        )

        if(!UpdatedHC){
            res.status(404).json({
            success:false,
            message:`${empid} is not found in Database`
        })}

         res.status(201).json({
            success:true,
            message:`${empid} is Updated successfully in DB`
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:"Error Ocuured during Updation",
            error:error.message
        })
    }

}

module.exports.DeleteEmployeeByID = async(req,res)=>{

    const HCID = req.body.empid;

    console.log(HCID)

    try{
        const delHC = await EmployeeModel.findOneAndDelete(HCID);

        // console.log(delHC);

        if(!delHC){
          res.status(404).json({
            success:false,
            message:`${HCID} is not found in Database`
        })
        }
        res.status(201).json({
            success:true,
            message:`${HCID} is successfully deleted from DB`
        })

    }catch(error){
        res.status(500).json({
            success:false,
            message:`Error occurred while Deleting`,
            error:error.message
        })
    }
}

module.exports.DeleteAllEmployee = async(req,res)=>{

    try{

        const result = await EmployeeModel.deleteMany({});

        if(result.deletedCount === 0){
            return res.status(404).json({
                success:false,
                message:"There is no Employee DB"
            })
        }

        return res.status(200).json({
            success:true,
            message:"All Employee data deleted successfully",
            deletecount:result.deletedCount
        })

    }catch(error){
            res.status(500).json({
            success:false,
            message:`Error occurred while Deleting`,
            error:error.message
        })
    }


}