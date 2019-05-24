var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#0072bc',
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var cursors;
var player;

var map = 
[
    ["0","0","S","0","0","B","0","X","X","X"],
    ["0","0","S","0","C","0","0","0","0","0"],
    ["0","0","B","B","B","B","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0"],
    ["0","0","0","0","0","0","0","0","0","0"],
]
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('B', 'assets/sprites/block.png');
    this.load.image('S', 'assets/sprites/blocksup.png');
    this.load.image('C', 'assets/sprites/cadeira.png');
    this.load.image('X', 'assets/sprites/cadeira2.png');
    this.load.image('PF', 'assets/sprites/personfrente.png');
    //this.load.image('PC', 'assets/sprites/personcosta.png');
    this.load.spritesheet('PC', 'assets/sprites/personcosta.png', { frameWidth: 28, frameHeight: 62 });

    this.load.image("background", "assets/background.png");
}

function create ()
{
    this.add.tileSprite(0, 0, 10000, 10000, 'background');

    cursors = this.input.keyboard.createCursorKeys();

    var config = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('PC'),
        frameRate: 6,
        yoyo: true,
        repeat: -1
    };

    anim = this.anims.create(config);

    player = this.physics.add.sprite(400, 300, 'PC');
    player.anims.load('walk');

    for( let i=0; i<map.length; i++ )
        for( let j=0; j<map[i].length; j++ )
        {
            if( map[i][j] != "0" )
            {
                let block = this.physics.add.image(64*j + 64/2, 64*i + 64/2, map[i][j]);
                block.setImmovable(true);
                this.physics.add.collider(player, block);
            }
        }
    
    player.setDepth(1);
    player.body.setSize(16, 16);
    player.body.setOffset(6, 46);
    player.setCollideWorldBounds(true);

    player.anims.play('walk');
}

function update ()
{
    player.setVelocity(0);

    if (cursors.left.isDown)
    {
        player.setVelocityX(-600);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(600);
    }

    if (cursors.up.isDown)
    {
        player.setVelocityY(-600);
    }
    else if (cursors.down.isDown)
    {
        player.setVelocityY(600);
    }
}

function render()
{

}