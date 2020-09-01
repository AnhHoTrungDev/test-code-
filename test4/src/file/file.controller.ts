import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Next,
  Get,
  Req,
  Res,
  Header,
  Body
} from "@nestjs/common";
import { diskStorage, multer } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileService } from "./file.service";
import { extname } from "path";
import * as FileType from "file-type";
import * as fs from "fs";

const checkPNG = (req, file, callback) => {
  if (!file.originalname.match(/\.(png)$/)) {
    console.log("<--->\nfile error =>>>>:", file, "\n not png");
    callback(null, false);
  } else callback(null, true);
};

@Controller("file")
export class FileController {
  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      fileFilter: checkPNG,
      limits: { fileSize: 30720 }
    })
  )
  async uploadFile(@UploadedFile() file) {
    if (!file) {
      throw new HttpException(
        "UNSUPPORTED MEDIA TYPE",
        HttpStatus.UNSUPPORTED_MEDIA_TYPE
      );
    } else {
      await (async () => {
        let getstypeFile = await FileType.fromFile(file.path);
        console.log("object :", getstypeFile);
        if (
          !getstypeFile ||
          getstypeFile["ext"] !== "png" ||
          getstypeFile["mime"] !== "image/png"
        ) {
          fs.unlinkSync(file.path);
          console.log("error change extention");
          throw new HttpException(
            "UNSUPPORTED MEDIA TYPE",
            HttpStatus.UNSUPPORTED_MEDIA_TYPE
          );
        } else console.log("file =>>>> save :", file, "\n--");
      })();
      // console.log("object :", getstypeFile);
    }
    return {
      id: file.filename,
      originalname: file.originalname,
      size: file.size
    };
  }
  @Get("download")
  getFile(@Req() req, @Res() res) {
    console.log("@get Download");
    let urlID = req.query.id.slice(0, 1);
    if (urlID === "" || urlID === "." || urlID === "/") {
      console.log("@get Download => Path traversal ");
      throw new HttpException("BAD REQUEST", HttpStatus.BAD_REQUEST);
    }
    console.log("<==req :", req.query.id);
    res.set("Content-Disposition", `attachment; filename=${req.query.id}.png`);
    console.log("send =>>");
    return res.sendFile(req.query.id, { root: "tmp" });
  }
}
