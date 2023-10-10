import {IsString,IsNotEmpty,Length, IsEmpty} from 'class-validator'
export class PostDto{
    @IsNotEmpty()
    @IsString()
    @Length(7,150,{message:'Title has to be at beetween 7 and 150 chars'})
    public post_title:string;

    @IsString()
    public post_image:string;


    @IsNotEmpty()
    @IsString()
    @Length(10,1000000,{message:'Title has to be at beetween 7 and 10000000 chars'})
    public post_content:string;
}