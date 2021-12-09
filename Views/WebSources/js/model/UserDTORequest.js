function UserDTORequest(
    
    nombre,
    apellido,
    email,
    password,
    role,
    confirmPassword
) {
    
    this.nombre = nombre
    this.apellido = apellido;
    this.email = email;
    this.password = password;
    this.role = role;
    this.confirmPassword = confirmPassword;
}