//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package com.nis.edu.kz.pdfgenerator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;

public class main {
    public main() {
    }

    public static void main(String[] args) throws IOException {
        Path resultDir = Paths.get(args[0]);
        Path pdfFilePath = Paths.get(args[1]);
        Path excelFilePath = Paths.get(args[2]);
        Path jsonFilePath = Paths.get(args[3]);
        if (!Files.exists(Files.createDirectories(resultDir), new LinkOption[0])) {
            Files.createDirectories(resultDir);
        }

        PdfGenerator generator = new PdfGenerator(resultDir, excelFilePath, pdfFilePath, jsonFilePath);
        generator.generate();
    }
}
