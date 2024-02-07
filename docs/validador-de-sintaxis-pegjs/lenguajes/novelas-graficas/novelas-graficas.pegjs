{
  function Dialogue(speaker, speech) {
    this.speaker = speaker;
    this.speech = speech;
  }

  function Scene(scene) {
    this.scene = scene;
  }

  function Comment(comment) {
    this.comment = comment;
  }

  function SetBackgroundImage(image) {
    this.image = image;
  }

  function SetBackgroundColor(color) {
    this.color = color;
  }

  function PlayVideo(video) {
    this.video = video;
  }

  function PlaySound(sound) {
    this.sound = sound;
  }
}

Program
  = Line*

Line
  = Dialogue
  / Scene
  / Comment
  / SetBackgroundImage
  / SetBackgroundColor
  / PlayVideo
  / PlaySound

Dialogue
  = "SAYS" _ Speaker:Identifier ":" speech:Textline { return new Dialogue(Speaker, speech); }

Scene
  = "SCENE" scene:Textline { return new Scene(scene); }

Comment
  = "//" comment:Textline { return new Comment(comment); }

SetBackgroundImage
  = "SET BACKGROUND IMAGE" _ image:QuotedString { return new SetBackgroundImage(image); }

SetBackgroundColor
  = "SET BACKGROUND COLOR" _ color:Color { return new SetBackgroundColor(color); }

PlayVideo
  = "PLAY VIDEO" _ video:QuotedString { return new PlayVideo(video); }

PlaySound
  = "PLAY SOUND" _ sound:QuotedString { return new PlaySound(sound); }

Speaker
  = name:Identifier ":" { return name.join(""); }

Textline
  = (!NewLine .)* NewLine { return text(); }

QuotedString
  = "\"" chars:([^"\r\n])* "\"" { return chars.join(""); }

Color
  = "#" hex:[0-9a-fA-F]+ { return "#" + hex.join(""); }

Identifier
  = [a-zA-Z_-]+ { return text() }

NewLine
  = "\r\n" / "\n" / EOF
  
EOF = !.

_ = __
__ = "\t" / " "
