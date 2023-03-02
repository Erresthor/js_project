import {addVector} from "./basic_utils.js";

function createGrid(sizex,sizey){
    let grid = [];
    for (let i = 0; i < sizex; i++){
        grid.push([]);
        for(let j = 0; j < sizey; j++){
            grid[i].push(0)
        }
    }
    return grid;
}

var hidden_grid = {
    sizeX : 7,
    sizeY : 7,
    gridObj : null,
    starting_positions : [[5,1],[5,2],[4,1]],
    obstacles : [[3,3],[3,2],[4,3]],
    end_positions : [[1,5]],
    current_char_pos : null,
    linked_gauge_animator : null,
    
    character_moved_event : new Event("character_moved"),
    trial_success_event : new Event("trial_success"),
    grid_ready_event : new Event("grid_ready"),
    
    initializeGrid:function(){
        this.gridObj = createGrid(this.sizeX,this.sizeY);
        for (const start_pos of this.starting_positions){
            this.gridObj[start_pos[0]][start_pos[1]] = 1
        }
        for (const end_pos of this.end_positions){
            this.gridObj[end_pos[0]][end_pos[1]] = 2
        }
        for (const obst of this.obstacles){
            this.gridObj[obst[0]][obst[1]] = 3
        }
    },

    isCoordinateInGrid(coordinates){
        return ((coordinates[0]>=0)&&(coordinates[1]>=0)&&(coordinates[0]<this.sizeX)&&(coordinates[1]<this.sizeY));
    },

    spawnCharacter:function(){
        var randomStartingPos = this.starting_positions[Math.floor(Math.random() * this.starting_positions.length)];
        this.current_char_pos = randomStartingPos;
        console.log("Character was spawned at " + this.current_char_pos);
    },

    showGrid:function(){
        // let dispArr = this.gridObj.map((x)=>(x.toString(10)));
        
        let dispArr = this.gridObj.map( 
            function( row ) {
                return row.map( 
                    function( cell ) { 
                        return cell.toString(10); 
                    } 
                );
            }
        )
        if (this.current_char_pos != null){
            dispArr[this.current_char_pos[0]][this.current_char_pos[1]] = 'X';
        }
        console.log(dispArr);
    },
    
    moveCharacter:function(movement_string){
        console.log("Updating character position from " + this.current_char_pos + " " + movement_string+"-wards.");
        let potential_nextpos = null;
        // console.log(potential_nextpos);
        // potential_nextpos = addVector(this.current_char_pos,[-1,0]);
        // console.log(potential_nextpos);
        switch(movement_string){
            case 'same':
                this.current_char_pos = this.current_char_pos
            case 'up':
                potential_nextpos = addVector(this.current_char_pos,[-1,0]);break;
            case 'up-left':
                potential_nextpos = addVector(this.current_char_pos,[-1,-1]);break;
            case 'up-right':
                potential_nextpos = addVector(this.current_char_pos,[-1,1]);break;
            case 'down':
                potential_nextpos = addVector(this.current_char_pos,[1,0]);break;
            case 'down-left':
                potential_nextpos = addVector(this.current_char_pos,[1,-1]);break;
            case 'down-right':
                potential_nextpos = addVector(this.current_char_pos,[1,1]);break;
            case 'right':
                potential_nextpos = addVector(this.current_char_pos,[0,1]);break;
            case 'left':
                potential_nextpos = addVector(this.current_char_pos,[0,-1]);break;
            // default:
                // potential_nextpos = this.current_char_pos;
        };
        // console.log(potential_nextpos);

        // Check if potential_nextpos is a viable option : 
        // Is it in the grid ?
        if (this.isCoordinateInGrid(potential_nextpos)){
            // If it is, is there any obstacles ?
            // console.log(potential_nextpos);
            // console.log(this.gridObj[potential_nextpos[0],potential_nextpos[1]]);
            if (this.gridObj[potential_nextpos[0]][potential_nextpos[1]]==3){
                // Then update the character position ;D
                console.log("Hit a mountain >:( !!") ;
            } else {
                this.current_char_pos = potential_nextpos;
            }
        }
        

        // Should we send an event ?
        // console.log("--->  " + this.linearDistanceToGoal());
        dispatchEvent(this.character_moved_event);
    },

    linearDistanceToGoal : function(){
        let h = this.sizeX - 1;
        let w = this.sizeY - 1;
        let maxdist = Math.sqrt(h*h+w*w);
        let returnThis = maxdist;
        for (const endpos of this.end_positions){
            let x2 = (this.current_char_pos[0]-endpos[0]);
            let y2 = (this.current_char_pos[1]-endpos[1]);
            let d = Math.sqrt(x2*x2+y2*y2);
            if (d < returnThis){
                returnThis = d;
            }
        }
        return (returnThis/maxdist);
    }
}


// Initialize the grid as soon as the window is loaded
window.addEventListener("load",function(event){
    window.myBackend = hidden_grid;
    myBackend.initializeGrid();
    myBackend.spawnCharacter();
    window.dispatchEvent(myBackend.grid_ready_event)
},false);