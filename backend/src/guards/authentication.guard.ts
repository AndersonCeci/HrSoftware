import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthenticationGuard  implements CanActivate{
    canActivate(context: ExecutionContext): boolean  {
       const request = context.switchToHttp().getRequest();
       const token = request.headers.authotarization?.split(' ')[1];
       if(!token){
        throw new UnauthorizedException();
       }
  const decodedToken = this.verifyToken(token);
  if(!decodedToken){
    throw new UnauthorizedException();
   
  }
  request.user =decodedToken;
  return true;
    }

    private verifyToken(token:string){
        try {
           // const decoded= jwt.verify(token,secretKey)
        return {id :123}  
        } catch (error) {
           return null; 
        }
       
    }
    
}