<div id="{{hash}}" class="remarks">
    <div data-hash="{{hash}}" class="add-comment">
        <textarea data-hash="{{hash}}" class="comment-field required" placeholder="What do you think?"></textarea>
        <span class="next-step" style="display: none;">
            <a href="#" class="remark-login">Login</a>
            <button data-hash="{{hash}}">Add note</button>
        </span>

    </div>

    <ul class="comments">
    </ul>

    {{! If you really want to remove this line, go for it, but please feel very guilty. }}
    <div class="homage">powered by <a href="http://remarkablejs.com" >Remarkable</a></div>
</div>