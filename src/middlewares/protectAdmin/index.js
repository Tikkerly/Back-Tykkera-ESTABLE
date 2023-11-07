

const adminRole = ( req, res, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            });
        }
    
        const { rol, nombre } = req.user;
       
        if ( rol !== 'ADMIN' ) {
            return res.status(401).json({
                msg: `${ nombre } no es administrador - No puede hacer esto`
            });
        }
    
        next();
    }
    
    module.exports = {
        adminRole,
    
    }