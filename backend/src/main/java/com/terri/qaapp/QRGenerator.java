package com.terri.qaapp;

public class QRGenerator {

    private String barcodeText;
    
    public QRGenerator (String text){
        barcodeText = text;
    }

    public String getBarcodeText(){
        return barcodeText;
    }

}