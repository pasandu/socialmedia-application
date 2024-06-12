import React from "react";

export default function Post() {
  return (
    <div className="profile-wrapper mt-5">
      <div className="content-wrapper">
        <div className="profile-card-wrapper">
          <div className="profile-card-header">
            {/* <div className='card' style={{height:"200px",width:"200px"}}>

                    </div> */}

            <div>
              <textarea />
            </div>

            <div>
                <div>
                <button className="btn btn-primary">
                upload
                <input hidden accept="image/*" multiple type="file" />
              </button>
                </div>
             
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
