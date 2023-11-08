const User = require("../../../models/User");


const deleteUser = async(req, res) => {
    try{
        const { id } = req.params;

         const user = await User.findByIdAndUpdate( id, { status: false } );

         return res.status(200).json({ message: user.username+" ha sido borradocon éxito" });
    }
    catch (error){
        return res.status(400).json({ message: 'Error al borrar el usuario.' });
    }
 
}

module.exports = deleteUser