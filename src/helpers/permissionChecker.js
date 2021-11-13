module.exports = function PermissionChecker(permission_name, permissions, error){

        const permission = permissions.find(x => x['permission.permission_name'] == permission_name);

        if(!permission) throw new error(400, "Permission denied");

}