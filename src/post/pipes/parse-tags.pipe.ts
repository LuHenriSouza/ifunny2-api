import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseTagsPipe implements PipeTransform {
    constructor() {
        console.log('PIPE CREATED');
    }
    transform(value: any, metaData: any) {
        console.log('VALUE:', value);
        console.log('META:', metaData);
        // console.log('PIPING:', post);
        // if (typeof post.tags === 'string') {
        //     try {
        //         console.log('TRYING TO PARSE:', post.tags);
        //         post.tags = JSON.parse(post.tags);
        //     } catch (error) {
        //         throw new BadRequestException('Invalid format for tags');
        //     }
        // }
        return value;
    }
}
