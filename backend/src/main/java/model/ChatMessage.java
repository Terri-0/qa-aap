package model;


public class ChatMessage {
    private String content;
    private int ID;

    public String getContent(){
        return content;
    }

    public void setContent(String content){
        this.content = content;
    }

    public int getID() {
        return ID;
    }

    public void setID (int ID){
        this.ID = ID;
    }
}
